# flex-area-grid

## Examples

1. Simple grid with fixed cell height

![Simple fixed height grid](https://i.ibb.co/CP1ZBsG/11.png)

```
    <FlexGrid cellHeight={100} columns={2} gridRowGap={16} gridColumnGap={16} verticalAlign="top">
        <FlexGridItem>
            <div style={{backgroundColor: 'red', height: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem>
            <div style={{backgroundColor: 'green', height: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem>
            <div style={{backgroundColor: 'blue', height: '100%'}}></div>
        </FlexGridItem>
    </FlexGrid>
```

2. Area grid with a fixed cell height

![Area grid with a fixed cell height](https://i.ibb.co/WkLzLfX/22.png)

```
    <FlexGrid cellHeight={100} columns={2} gridRowGap={16} gridColumnGap={16} verticalAlign="top">
        <FlexGridItem startRow={1} startColumn={1}  endRow={4} endColumn={1}>
            <div style={{backgroundColor: 'red', height: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem>
            <div style={{backgroundColor: 'green', height: '100%'}}></div>
        </FlexGridItem>
        <FlexGridItem>
            <div style={{backgroundColor: 'blue', height: '100%'}}></div>
        </FlexGridItem>
    </FlexGrid>
```

3. Area grid with an auto cell height

![Area grid with an auto cell height](https://i.ibb.co/sJghNgT/33.png)

```
    <FlexGrid columns={2} gridRowGap={16} gridColumnGap={16} verticalAlign="top">
        <FlexGridItem startRow={1} startColumn={1} endRow={4} endColumn={1}>
            <div style={{backgroundColor: 'red', height: '500px'}}></div>
        </FlexGridItem>
        <FlexGridItem startRow={1} startColumn={2} endRow={1} endColumn={2}>
            <div style={{backgroundColor: 'green', height: '40px'}}></div>
        </FlexGridItem>
        <FlexGridItem startRow={2} startColumn={2} endRow={2} endColumn={2}>
            <div style={{backgroundColor: 'blue', height: '100px'}}></div>
        </FlexGridItem>
        <FlexGridItem startRow={3} startColumn={2} endRow={3} endColumn={2}>
            <div style={{backgroundColor: 'blue', height: '200px'}}></div>
        </FlexGridItem>
    </FlexGrid>
```
