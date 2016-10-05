# Fluid3

## Component
All **fluid3** components inherit from `Component`
### Attributes
* `x`
* `y`
* `width`
* `height`
### Methods
Constructor: `new Component(group)`: *group* is the **d3** group managed by the component.
* `attr()`: Return the current attributes of the component
* `attr(key, value)`: Set the value of the component's attribute *key*
* `attr(object)`: Expand the component's attributes with *object*
* `update(duration, delay)`: After a *delay*, updates the visual component with a transition of *duration* ms.
* `append(class, update)`: Appends a new object of the *class* to this component, and when this component updates, it fires *update* (and the new object's update method, if present).

## Bar
A **bar** represents a value inside a domain.
### Attributes
* `value`
* `scale`: a **d3** scale, like `d3.scaleLinear()`
* `domain`: an array `[min value, max value]`
* `towards`: can be `'top'` (default), `'bottom'`, `'right'`, `'left'`, indicates the direction of the bar
### Example
```javascript
var bar = new Bar(d3.select('svg'))
    .attr({
        x: 0,
        y: 0,
        width: 40,
        height: 100,
        value: 0,
        domain: [0, 100]
    })
    .update()
    .attr({value: 100})
    .update(1000);
```