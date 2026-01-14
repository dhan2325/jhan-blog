# My Take on Tauri V2

### How it all began

Towards the end of 2023, I found myself involved in a project that was using [Tauri](https://tauri.app/) to turn an existing web application into a native app. While perhaps not as mature as its frequent counterpart Electron, we also saw a lot of the promise of this new framework - it was quite performant, it had a fairly rich feature set, supported multiple targets, and yielded much smaller application sizes than Electron apps typically do. We were fairly excited about this seeming upstart in the app development world, and decided to give it a shot.

When we began our development, the latest stable release of Tauri was v1.5, with a v2 alpha release. We chose to develop using the more stable v1.5 release, understanding we might need to migrate at some point in the non-distant future, thinking that an alpha release simply wouldn't be reiable for us to work with.

Just about a month in, I encountered a bug in the [coloring of the menu bar](https://github.com/tauri-apps/muda/issues/97) on Windows inherent to Tauri. Fortunately for me, I wasn't the first to encounter the issue, and a fix had already been merged. The bad news for me was that this fix was only being merged into the v2 branch, and not into any v1 releases, meaning unless I migrated to v2, my Windows app would have a poorly colored menu bar.

I'd heard previously that a v2 for the Tauri project had been in the works, but I wasn't keeping up with the state of the project or just how far along that v2 was. However, noting that this fix had only been made for v2, I decided to look it up, just to check.

To my surprise, I found that just earlier that week, the Tauri team had gotten v2 to a point where they felt it was stable enough for its first beta release, after some time in Alpha. I was hesitant at first - I didn't know just how stable that beta version would be, but I figured it was at least worth trying to migrate my app over into v2 and seeing if it would be worth making the switch now, before Tauri had a stable v2 release. So, I decided I'd have to get my hands dirty, and began reading docs for migrating over to Tauri v2.

### The migration process

The migration process required a substantial amount of work, but reasonable. There was a Tauri CLI tool that did a lot of the work for me, but given that there were substantial changes between Tauri v1 and v2 in terms of the APIs that provided some pretty key native functionality, there was no way to avoid rewriting significant chunks of code. Fortunately, the native app was at a pretty early stage in terms of development so there was only so much rewriting to be done.

Overall, migrating was a little more involved that I'd anticipated, but after having completed it, the title bar styling issue I had was resolved, and I considered my options. I could either continue developing in v2, or I could revert to v1 and just live with the coloring bug. After some consideration, I decided I would stick with v2 - the migration would have had to happen at some point anyways, and I would be dealing with unwanted bugs one way or the other, so I decided I'd rather deal with the growing pains of v2 than the residual unfixed bugs on v1.

### Development in v2

Unfortunately for me, developing in v2 post-migration wasn't perfectly smooth sailing either. The biggest annoyance while migrating to v2 was that there was, at least during the beta phase, a glaring lack of documentation. In fairness, this is to be expected from a beta app when the Tauri development team (bless their souls) were likely focusing on features and fixes in v2 rather than documentation. However, with some help from the community via the discord channel and the github issues, I was able to resolve all issues I ran into.

For most of the rust functionality belonging to Tauri and not any of its extensions, I found that the [docs.rs](https://docs.rs/tauri/latest/tauri/) page was a very helpful source. Though v2's API was not yet documented with tutorials like the v1 API was, the documentation of the source code on docs.rs was enough to allow me to figure out most problems I ran into.

### The verdict?

Despite being in a fairly early stage in development, I thought migrating over to Tauri v2 and working in it went about as well as one could expect for an early beta stage software tool. As the project progresses, I'm sure working in it will get even easier, but even now, I found that the migration was worth my effort given the additional features and bug fixes I could only access in v2.

However, I think I would still recommend (at the time of writing this post) to most people looking to start a new project in Tauri or looking to create a native app from an existing web app wait until v2 has a stable release and more documentation is written. Migrating early made sense in my case because I was looking for some pretty niche fixes in v2, and because I knew this project was going to progress to a point that staying in v1 until v2 was stable would incur a fair amount of tech debt. However, for the average user, I think v1 is plenty feature rich and was easier to work with given that it was better documented.
