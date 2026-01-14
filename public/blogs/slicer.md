# Five-Axis 3D Printing, Enabled in Rust
In Summer of 2023, I was brought onto the team at EDL as a software engineer to lead the development of their very own slicer application that they were building in order to unlock the full potential of their new five-axis printer. I was able to help develop a slicer from scratch, using the Rust programming language, and implement some geometric slicing algorithms of my own design. The project was really interesting in a lot of ways and presented a very unique opportunity that I wanted to share here.

## The PLU5 Printer

![the PLU5 printer](../images/printer_slant.png)

While 3D-printing has become a fairly well-established manufacturing method for both its accessibility and speed, the team at EDL had a few ways we thought we could make a few improvements. The novelty of our printer stems primarily from the fact that our printer features two rotational axes in addition to the 3 linear axes found on traditional printers. Similar setups are already common in the subtractive manufacturing analog to 3D printing (i.e. CNC mchines), but our aim was to bring the same technology to 3D printing at a reasonably affordable price point.

The [PLU5 printer](https://www.plus5axis.com/) is actually available for pre-order right now, and the product and it's capabilities are explained better on the website than anything I can manage (yes, they are for sale and yes I am shamelessly plugging it here but I promise it's actually kinda cool please go check it out).

## The Software Stack

### "Talking" to the printer

It's very widespread practice for 3D printers and similar CNC machines to operate in Gcode - Gcode is a human-readable set of instructions that can be used to command a 3D printer's motion. Gcode provides a wide range of functionality, and Gcode instructions can be used to do anything from moving the tooltip to heating up the extrusion bed and even changing some of the machine's configuration parameters. A 3D printer will typically start a printing job by accepting a Gcode file, and will execute each instruction in sequence until the print is completed. On board the 3D printer is typically some sort of control board that is able to manage the machine's kinematics in real-time, command all actuators aboard the printer, and read in Gcode to perform a print job. This is enabled by the [firmware](firmware.html) installed on the control board.

Now while Gcode is technically human-readable, that doesn't make it very fun to write Gcode manually. A reasonably complex print can have tens of thousands of lines of Gcode if not more, meaning that 3D printing is useful and efficient only if there is a convenient way for the user to generate a series of Gcode commands that, when executed by a 3D printer, will manufacture the desired end product. Fortunately for 3D printing enthusiasts, there is a group of computer applications available called slicers that readily turn user-created models into Gcode that printers can then use to print the model in question, making the process fairly streamlined.

### What's a slicer?

Slicers have been around for some time, and while various slicers have different features and functions, most slicers enable the user, via a GUI, to import 3D model(s) into the printer's build area, organize them however they please, and then produce a Gcode file that will allow a 3D printer to print the model in question. Modern slicers now also allow users to customize their print settings to optimize for print time, structural strength, material used, etc.

### So... why bother with making your own?

In addition to there being multiple slicers that are designed specifically to generate Gcode for a specific hardware build, there are some open-source slicers that allow a user to generate Gcode for any printer that is supported by that particular slicer. Moreover, there are open-source slicing engines that provide many generic functions that could be used as the basis for MOST 3D printers. We were aware of the existence of such open-source software when we began the project, and the reason we decided to make our own codebase from scratch is that existing 3D printer software was all optimized for running on machines that had 3 linear axes, as is standard for 3D printers. However, to fully enable the five-axis printer that we had built, we needed to develop some novel slicing algorithms specifically meant for printing in non-conventional ways, which meant that even if we wanted to borrow functionality from an existing project, we'd have a lot to implement from scratch. So we decided to start our own slicer from scratch, and maintain full control of the architecture, deployment, and implementation of the slicing application.

### Why Rust?

The slicer application we had in mind would need to perform a few essential tasks - it would have to manage a GUI, perform complex computations in an optimized way, provide multithreading implementations, and allow for low-level control of memory. Given these constraints, most developers would lean towards using C++ as the primary language - it's a mature language that's very commonplace in the industry and has a lot of upside. It's also the primary language in which many of the reference slicers we looked at were written in. It was certainly a strong canididate for our primary language of development, but we chose not to proceed with it, favouring Rust instead.

Rust is a strongly-typed, compiled language that offers a lot of the same benefits as C++ - it provides a similar level of abstraction, allows for low-level memory control, and has good multithreading capabilities. When comparing the two, there was one key advantage that using either language would have provided. C++ was and older, more widely used language, meaning that we would be likely to have more robust/complete libraries that we could make use of while developing our slicer. On the other hand, Rust has a unique memory management system - it allows users to allocate and deallocate memory manually, a bit like C++, but also make use of an ownership system which forces developers to be more aware of which functions have access to difference variables in the workspace, ultimately helping to prevent common errors encountered in C++, such as the dereferencing of a null pointer.

The decision was a tough one to make, but we decided to proceed with Rust - it would minimize debugging times compared to C++, and the existing Rust libraries still provided more than enough of a starting point for us to use to develop our slicer. Since a lot of the geometric operations we had in mind would requires custom implementations regardless of language, we figured the additional breadth of libraries offered by C++ wouldn't be largely beneficial to us.

If you're curious about the Rust/C++ debate, you should check out my [blog post](rust.html) comparing the two and talking at length about the benefits of eaach.

## Solving the 3-Axis problem

### Abstracting into Layers

Before contemplating the more advanced geometries that our additional two axes would unlock, we needed to solve the 3-axis slicing problem to give ourselves a starting point. While there were no novel ideas in our implementation of the 3-axis slicer, looking through a couple other slicer codebases and then writing our own gave good insight into how various concepts in slicing could be abstraced, in addition to helping me decide how I wanted to organize the codebase. Each print operation starts with an instance of a PrintJob object, which is a structure used to store the triangle meshes for the objects to be printed, in addition to the relevant settings that the user provided. The PrintJob then also owns an instance of a 3D layer-processor object, which performs the geometric analyses required to convert a solid model into a series of paths for the printer to follow.

Since a 3-axis print is printed bottom up in layers (typically of equal thickness), the print is then sectioned off into horizontal layers. Then, within each layer, additional analysis is done to determine which parts of the layer need to be printed with a solid fill or with a sparse infill pattern. Finally, for each region on each layer, the paths that the print head will need to take to fill said region are generated, and then written in Gcode for the machine to interpret.

### Codebase Structuring

As mentioned before, the 3-axis problem had long since been solved, and implementing it ourselves was largely just a chance to see what other, similar projects had done, and how they had abstracted certain tasks. Our implementation certainly draws from those references, but is also designed to be more generic and extensible. The structure of the 3-axis slicer needed to be extensible to the 5-axis advanced geometry, and this influenced my decisions about how to organize the codebase.

## Solving the 5-Axis problem

### Step by Step

While the actual paths generated by a 5-axis slicer would be very different than those generated by a 3-axis slicer for the same object, the processing pipeline is surprisingly similar. The object is deconstructed into a series of layers to be printed into sequence, then each layer is processed largely independently from the rest to generate Gcode. As such, I decied that it made the most sense to keep a similar pathway for all different slicing algorithms in the codebase - divide a PrintJob into layers, process each layer independently, then put it all back together. Even the process for generating a single layer looks very similar. As such, I decided to take advantage of Rust's somewhat unique approach to implementing polymorphism and effectively implement each slicing algorithm engine as a subclass of a larger "slicer" class.

### Implementing Traits!

Polymorphism is one of the four pillars of OOP (Object-Oriented Programming) that allows a single object to take on many forms, and behave as an instance of more than one class, depending on how you would like to interact with it. Popular OOP languages such as Python, C++, and Java all implement polymorphism in the same way - a parent class is defined, and then subsequent child classes can be declared as child classes of parent classes. For instance, if there exists an Animal class and a Dog subclass, the parent class can implement methods/fields that specify its height, weight, etc, while the dog subclass can implement methods/fields that involve the dog's breed, and so on.

Rust implements polymorphism in a slightly different way. In Rust, a similar effect can be achieved by using a "Trait". In Rust, a Trait is defined as a series of methods for which only the arguments and outputs are defined. Then, for any given struct, I can implement that Trait by defining the behvariour of each of the trait methods, and from that point on, the methods of the trait can be called for any instance of that object. This is useful since struct fields and function paramters can be specified as being an instance of any class that implements a trait.

I was able to make use of this neat technique by defining a "LayerProcessor" trait that each slicing algorithm would have to implement. This in turn allowed me to write more generic functions, which would always call the LayerProcessor methods for each slicing algorithm, and then each slicer would run its own implementation of those methods. It seemed to me a neat way to abstract the various underlying processes and svae myself some effort.

### Geometric Challenges

While I'm not at liberty to disclose exactly how we solved the problems that we faced (as much as I might like to discuss it here), I wanted to speak to the nature of the problems that we encountered for which we were not able to find existing solutions that were sufficiently robust. In general, the idea was to implement each of the existing 3-axis slicing method steps for various geometries - what does it mean to split up a print into layers if those layers are no longer planar, but on the surface of concentric spheres? What about cylinders? Cones? It involved a lot of geometry and no small amount of linear algebra to develop algorithms for processing arbitrary 3-dimensional triangle meshes in stable and robust ways.

One of the things we had to implement with close to no reference point was how to generate infill for a five-axis print. In 3-axis prints, the entire model is (generally speaking) somewhat hollow - underneath the surface of the printed object is a volume of space that is not completely filled in with material throughout, but with some repeated, hollow structure called an [infill pattern](https://all3dp.com/2/cura-infill-patterns-all-you-need-to-know/). Each infill pattern in 3-axis printing provides some advantage - being faster to print, being structurally stiffer in a certain direction, having more isotropic properties, etc. We were challenged to define similar infill patterns for each new slicer we developed. Yes, we could use the exact same geometries that would be printer for 3-axis infill and just print them in a different paradigm, but doing so would, in most cases, not provide the same advantages for which one would choose that infill pattern on a 3-axis print.

Therefore, the problem to solve was NOT how we could recreate the same physical patterns, but rather, what the analogous pattern would look like for each printing paradigm. What kind of infill was fastest when printing in cylindrical layers? Strongest when printing in spherical layers? These were the problems we had to address to get the desired qualities in the final prints for various printing paradigms, and was not, we found, a question that had been thoroughly addressed previously, and I had a great deal of fun trying to answer those very questions.
