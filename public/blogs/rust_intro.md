# My thoughts on Rust

At the time of writing this post, I've been working full-time in the Rust programming language for about eight months. Here's my take on the language, its affordances, its elegances, and its pitfalls.

## How I became a Rustacean

During my time at EDL, the first project I was assigned to was a [slicer for a five-axis 3D printer](./slicer.html). I began by designing the stack architecture for the slicer backend and web deployment. As the lead software engineer for the project, I was responsible for everything from determining the endpoints for the front and back end, our deployment strategy, and most importantly, the language we would be using to develop the slicer.

Going into it, I was under the impression that we would using C++ for our backend (as well as the frontend during the testing stage, before web deployment). It was the obvious choice in my mind - fast, reliable, very-well documented as a result of years of being the industry standard. Perfect for for an application like the one we had in mind, which would need to perform scientific computations at blazing speeds and provide acces to low-level memory and thread management.

One of my colleagues, however, suggested that I look into the Rust language as a candidate development language for this project. I started doing some research on the language, and quickly came to realize that it had a lot to offer. I ended up settling on Rust (obviously, otherwise this blog post would not be here) for a few different reasons that I'll outline later in this article.

## So what is Rust?

That was the first question on my mind as I took to the internet to hear what people had to say about the language. The technical, encyclopedia answers told me that Rust is a strongly typed low/mid-level language (comparable to C++) with low-level resource management and great performance. At first glance, it seemed similar to C++ in terms of the applications it could be used for and the affordances of the language. While useful information, it wasn't enough for me to make a decision, so I dug a little further.

As I read, I began to learn about some of the more niche elements of the Rust language. For instance, I learned that it has a unique memory management system that enforced memory safety. Syntactically, after reading just a couple examples, I found that it was much more legible that C++. As it turned out, some applications that I'd been using on a day-to-day basis, such as the [Spotify terminal application](https://flathub.org/apps/io.github.hrkfdn.ncspot) (I find that the Linux Spotify desktop app is unbearable) I'd been using for some time was written in Rust. Moreover, it seemed that it had a very enthusiastic community of users who had pretty high praise for the language. After some more research, and reading through the first few sections of the [official Rust book](https://doc.rust-lang.org/book/), I shared my findings with the rest of the team, and we decided that it could be beneficial for us to go forward with Rust.

## Hello Rustaceans!

The Hello World program in rust is reasonably simple:

```rust
fn main() { // Statements here are executed when the compiled binary
    println!("Hello World!"); 
}
```

As with other compiled languages, Rust uses a main function with no arguments or output as the entry point (at least for standard compile targets). The `println!` macro is the defacto way of displaying a print statement, and more generally speaking, exclamation marks are used to define custom macros in Rust. Regarding syntax, I found Rust to be reasonably clean and easy to pick up.

## Hands off my Variables!

While most other concepts/ideologies in the Rust programming language could be supplemented by my background in other Object-Oriented Programming languages like C++ and Python, one thing I needed to pick up was the ownership system in Rust. Long story short - in Rust, each variable, whether it is allocated on the heap or stack, is owned by a single function, and there are rules enforced by the compiler regarding how varibales can be passewd from enclosure to enclosure.

The ownership system in Rust, though it might feel like a pain to pick up at first, actually enforces a lot of good practices and is able to eliminate some common bugs present in C++ code, such as having multiple concurrent mutable references, or the dereferencing of a pointer to a de-allocated variable. Among the various features that make Rust unique, this is one that I was wholeheartedly on board with. I also found that after a short while, writing code that respected the ownership system did not require much extra thought, and to make it even easier, common IDEs like VScode also have Rust plugins that give errors related to the ownership system.

## Shipping with Cargo

One of the things that made Rust much easier to start working with compared to C or C++ was Cargo, a the one stop shop for most standard compile paths. In Rust, packages are referred to as "crates", and the crate dependencies are managed by "Cargo" (I would make a pun here about "haha get it? Cuz Cargo ships crates?" but this joke is already made on every Rust guide I've seen online). The defacto way of compiling a Rust project is using Cargo, and Cargo makes use of a `Cargo.toml` file at the root of your project to determine what crates to import and other details about how to compile your application. The `Cargo.toml` file allows you to specify the dependencies of your project, what features you need for each dependency, and a whole lot more. I personally found compiling with Cargo to be a much more straightforward way of managing and maintaining dependencies for a codebase than I'd seen for C++ codebases, and think it makes getting started with Rust much easier than it otherwise would be.

## Missing Crates?

Unforuntately, Rust is not without its shortcomings, and the one I found the most annoying to work around was the lack of existing crates compared to C++. Having been around for so long, C++ has several open source libraries for just about any application, which meant it was very uncommon that I'd find myself "reinventing the wheel", so to speak, when writing in C++. On the contrary, Rust is a much newer language, and as such, I found myself, more than once, writing code to implement something that could have been done in C++ by simply using an existing library.

To be fair to Rust, I did find that there were existing crates for most of the functionality I had in mind. During my time at EDL, I used a wide range of crates to implement various features, ranging from 3D rendering and GUI work to I/O and peripheral access on a Raspberry Pi. However, crates for more niche applications were either nonexistent or severely lacklustre, and ultimately, this did mean I had to spend more of my time implementing certain features from scratch.

## The Lonely Life of a Rustacean

While the lack of available crates proved somewhat inconvenient as a Rust developer, I found that the greatest inconvenience while writing Rust stemmed from the lack of developers that used Rust on a regular basis.

While the I think the Rust community is well-deserving of its reputation as being an enthusiastic group of developers, the fact remains that C++ is used far more commonly in the industry. One thing we did not consider when choosing to use Rust was how difficult it would be to find and hire developers with Rust experience. While it was completely within reason to think that an experiences C++ developer could pick up Rust, this would mean any new hires would take longer before being productive, and we found it hard to find developers with relevant Rust experience. It's certainly something I would take into account when deciding on a language for a new project going forward.

## So... should I use Rust?

Well, that's up to you. Ultimately, I enjoy writing in Rust, and I think the language has a lot of cool features, but the attitude in the industry seems to be that C++ works just fine, and if it ain't broke don't fix it. Regardless of whether or not you choose to use Rust for your next project, I hope you'll at least give it some thought, and that this article was at least somewhat informative.
