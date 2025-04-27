[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/Common](../README.md) / ConfirmDialog

# Variable: ConfirmDialog

> `const` **ConfirmDialog**: `React.FC`\<`ConfirmDialogProps`\>

Defined in: [src/ui/companents/common/ConfirmDialog.tsx:72](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/companents/common/ConfirmDialog.tsx#L72)

A modal dialog component for confirming user actions

## Component

## Param

Component properties

## Param

Controls dialog visibility

## Param

Dialog title text

## Param

Dialog message content

## Param

Text for confirm button

## Param

Text for cancel button

## Param

Callback function for confirm action

## Param

Callback function for cancel action

## Param

Visual style variant

## Returns

The dialog component or null if not open

## Example

```ts
<ConfirmDialog
  isOpen={showDialog}
  title="Delete Item"
  message="Are you sure you want to delete this item?"
  onConfirm={handleDelete}
  onCancel={() => setShowDialog(false)}
  variant="danger"
/>
```
