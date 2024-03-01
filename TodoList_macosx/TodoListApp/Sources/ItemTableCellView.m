//
//  ItemTableCellView.m
//  TodoListApp
//
//  Created by Danil Korotenko on 3/1/24.
//

#import "ItemTableCellView.h"

@interface ItemTableCellView ()

@property(strong) Item *item;

@property(readwrite) BOOL isEditing;

@end

@implementation ItemTableCellView

- (void)representItem:(Item *)anItem
{
    if (self.item == nil || self.item.itemId != anItem.itemId)
    {
        self.item = anItem;
        self.textField.stringValue = self.item.text;
    }
    else
    {

        if (!self.isEditing)
        {
            self.item.text = anItem.text;
            self.textField.stringValue = self.item.text;
        }
    }
}

- (void)controlTextDidBeginEditing:(NSNotification *)obj
{
    self.isEditing = YES;
}

- (void)controlTextDidEndEditing:(NSNotification *)obj
{
    self.isEditing = NO;
    self.item.text = self.textField.stringValue;
    [self.delegate itemDidChange:self.item];
    NSLog(@"text did end edit");
}


@end
