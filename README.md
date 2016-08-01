# riot-tag-loader

webpack loader for [riot](https://github.com/muut/riotjs)

You can use the riot's myparser.

## Usage

### Example

`app.tag`:

```jsx
<app>
    <p>this is {appTag}</p>

    this.appTag = 'app tag'
</app>
```

`index.js`:

```js
require('./app.tag');
```

`webpack.config.js`:

```js
...
module.exports = {
    entry: './index.js',
    output: {
        filename: './bundle.js'
    },
    ...
    module: {
        loaders: [
            {
                test: /\.tag$/,
                loader: 'riot-tag-loader'
            }
        ]
    },
    ...
};
```

## Compile options

`webpack.config.js`:

```js
loaders: [
    {
        test: /\.tag$/,
        loader: 'riot-tag-loader',
        query: { type: 'babel' } // <- this
    }
]

```

NOTE:If you want to use the 'babel' parser that comes with the 'riot-compiler', babel-core should be installed in the global. See [here](http://riotjs.com/guide/compiler/#pre-processors).


### Available option

* compact: `boolean`
* whitespace: `boolean`
* expr: `boolean`
* type: `String, coffeescript | coffee | typescript | babel (using babel-core v6.x and the es2015 preset) | es6 (using babel-core or babel v5.x)| livescript | none | 'myJsParser'`
* template: `String, pug | jade (deprecated) | 'myHtmlParser'`
* style: `String, less | sass | scss | stylus | 'myCssParser'`
* config: `String`
  * riot.config.js path

  `riot.config.js`:

  ```js
  module.exports = {
    compact:true,
    ...
  }
  ```

If you want to use 'myparser',do this.

`riot.config.js`:

```js
module.exports = {
    parsers:{
        css:{
            myCssParser:function(tag, css){...}
        }
    }
}
```


`webpack.config.js`:

```js
loaders: [
    {
        test: /\.tag$/,
        loader: 'riot-tag-loader',
        query: { config: './riot.config.js' }
    }
]

```

