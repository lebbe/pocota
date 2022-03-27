# About tests

The setup of tests in this project is somewhat different from a normal
project. I didn't want to have Babylon and its presets and plugins,
necessary to run Jest on Typescript code, as development dependencies.
Therefore I have a setup where Typescript compiles all code and put
them in this folder. Then Jest uses the compiled version within this
folder when running tests.

For running the tests once, just run:

```
npm run test
```

If you want a watcher to run continiously while developing, you
need to start TWO watch-processes: One for TypeScript and one
for Jest:

```
npm run test:watch-ts

[in a different terminal:]

npm run test:watch
```

My preferred setup is to split the terminal in VS Code, and run
TypeScript watch to the left, and Jest watch to the right. This
way I can see compilation warnings and errors in the left console,
and test success/error in the right console.

If you want, you can of course run them in parallell in the same
console window instead. Requires Unish:

```
(trap 'kill 0' SIGINT; npm run test:watch-ts --watch & npm run test:watch)
```
