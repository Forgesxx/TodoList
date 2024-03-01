//
//  ItemTableCellView.h
//  TodoListApp
//
//  Created by Danil Korotenko on 3/1/24.
//

#import <Cocoa/Cocoa.h>
#import "Item.h"

NS_ASSUME_NONNULL_BEGIN

@protocol ItemTableCellViewDelegate <NSObject>

@required

- (void)itemDidChange:(Item *)anItem;

@end

@interface ItemTableCellView : NSTableCellView

@property (weak) id<ItemTableCellViewDelegate> delegate;

- (void)representItem:(Item *)anItem;

@end

NS_ASSUME_NONNULL_END
