# `babel-plugin-remove-prev-node`

In:

```js
import { Foo, Bar /* @babel-remove-prev-node */ } from "bla";
```

Out:

```js
import { Foo } from "bla";
```
