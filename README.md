# flex-area-grid

_When is it a useful?_

For each case when you are needed in supporting old browsers such as an Internet Explorer 11 or a Chrome version 41 when the grid feature isn't implemented fully.

## FlexGrid props:

1. `{boolean | undefined}` - showGrid
2. `{number | undefined}` - cellHeight
3. `{number}` - columns
4. `{standart flex align-item | undefined}` - cellAlign
5. `{standart flex justify-content | undefined}` - cellJustify
6. `{number | undefined}` - gridRowGap
7. `{number | undefined}` - gridColumnGap

## FlexGridItem props:

1. `{number | undefined}` - startRow
2. `{number | undefined}` - startColumn
3. `{number | undefined}` - endRow
4. `{number | undefined}` - endColumn

## Examples

1. __A simple grid using a fixed cell height__

![Simple fixed height grid](https://i.ibb.co/CP1ZBsG/11.png)

```
    <FlexGrid cellHeight={100} columns={2} gridRowGap={16} gridColumnGap={16}>
        <FlexGridItem>
            <div style={{backgroundColor: 'red', height: '100%', width: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem>
            <div style={{backgroundColor: 'green', height: '100%', width: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem>
            <div style={{backgroundColor: 'blue', height: '100%', width: '100%'}}></div>
        </FlexGridItem>
    </FlexGrid>
```

2. __An area grid using a fixed cell height__

![Area grid with a fixed cell height](https://i.ibb.co/WkLzLfX/22.png)

```
    <FlexGrid cellHeight={100} columns={2} gridRowGap={16} gridColumnGap={16}>
        <FlexGridItem startRow={1} startColumn={1}  endRow={4} endColumn={1}>
            <div style={{backgroundColor: 'red', height: '100%', width: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem>
            <div style={{backgroundColor: 'green', height: '100%', width: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem>
            <div style={{backgroundColor: 'blue', height: '100%', width: '100%'}}></div>
        </FlexGridItem>
    </FlexGrid>
```

![Area grid with a fixed cell height](https://i.ibb.co/ysPBxcM/44.png)

```
    <FlexGrid cellHeight={100} columns={2} gridRowGap={16} gridColumnGap={16}>
        <FlexGridItem startRow={1} startColumn={1}  endRow={3} endColumn={1}>
            <div style={{backgroundColor: 'red', height: '100%', width: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem>
            <div style={{backgroundColor: 'green', height: '100%', width: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem startRow={4} startColumn={1}  endRow={5} endColumn={2}>
            <div style={{backgroundColor: 'blue', height: '100%', width: '100%'}}></div>
        </FlexGridItem>
    </FlexGrid>
```

3. __An area grid using an auto cell height__

![Area grid with an auto cell height](https://i.ibb.co/sJghNgT/33.png)

```
    <FlexGrid columns={2} gridRowGap={16} gridColumnGap={16}>
        <FlexGridItem startRow={1} startColumn={1} endRow={4} endColumn={1}>
            <div style={{backgroundColor: 'red', height: '500px', width: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem startRow={1} startColumn={2} endRow={1} endColumn={2}>
            <div style={{backgroundColor: 'green', height: '40px', width: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem startRow={2} startColumn={2} endRow={2} endColumn={2}>
            <div style={{backgroundColor: 'blue', height: '100px', width: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem startRow={3} startColumn={2} endRow={3} endColumn={2}>
            <div style={{backgroundColor: 'blue', height: '200px', width: '100%'}}></div>
        </FlexGridItem>
    </FlexGrid>
```
