//
//  Document.m
//  TodoListApp
//
//  Created by Danil Korotenko on 2/29/24.
//

#import "Document.h"
#import "WebApi.h"
#import "Preferences.h"
#import "Item.h"
#import "ItemTableCellView.h"

@interface Document ()

@property (strong) IBOutlet NSTableView *allItemsTable;

@property (readwrite) NSArray *allItems;
@property (readwrite) NSArray *allItemsItems;
@property (strong) NSMutableArray *allItemViews;

@property (strong) NSTimer *updateTimer;

@end

@implementation Document
{
    dispatch_queue_t _serverQueue;
}

@synthesize allItems;

- (instancetype)init
{
    self = [super init];
    if (self)
    {
        _serverQueue = dispatch_queue_create("TodoList.server.queue", DISPATCH_QUEUE_SERIAL);
        self.allItemViews = [NSMutableArray array];
    }
    return self;
}

+ (BOOL)autosavesInPlace
{
    return YES;
}

- (NSString *)windowNibName
{
    return @"Document";
}

- (NSData *)dataOfType:(NSString *)typeName error:(NSError **)outError
{
    [NSException raise:@"UnimplementedMethod" format:@"%@ is unimplemented", NSStringFromSelector(_cmd)];
    return nil;
}

- (BOOL)readFromData:(NSData *)data ofType:(NSString *)typeName error:(NSError **)outError
{
    [NSException raise:@"UnimplementedMethod" format:@"%@ is unimplemented", NSStringFromSelector(_cmd)];
    return YES;
}

- (void)awakeFromNib
{
    [self updateItems];

    self.updateTimer = [NSTimer scheduledTimerWithTimeInterval:[Preferences shared].updateInterval
        repeats:YES block:^(NSTimer * _Nonnull timer)
        {
            [self updateItems];
        }];
}

#pragma mark -

- (void)updateItems
{
    dispatch_async(_serverQueue,
    ^{
        [[WebApi shared] getAllItemsWithCompletionHandler:
            ^(NSArray * _Nullable allItems, NSError * _Nullable error)
            {
                if (error)
                {
                    //TODO: represent error
                    return;
                }

                self.allItems = allItems;
            }];
    });
}

- (NSArray *)allItems
{
    return allItems;
}

- (void)setAllItems:(NSArray *)anAllItems
{
    if (![allItems isEqualToArray:anAllItems])
    {
        allItems = anAllItems;

        NSMutableArray *mutableItems = [NSMutableArray array];
        for (NSDictionary *itemDictionary in allItems)
        {
            Item *item = [Item itemWithDictionary:itemDictionary];
            [mutableItems addObject:item];
        }

        [mutableItems addObject:[Item emptyItem]];

        self.allItemsItems = mutableItems;

        [self updateTable];
    }
}

 - (void)updateTable
 {
    dispatch_async(dispatch_get_main_queue(),
    ^{
        NSIndexSet *selectedRows = self.allItemsTable.selectedRowIndexes;
        [self.allItemsTable reloadData];
        if (self.allItems.count > selectedRows.lastIndex)
        {
            [self.allItemsTable selectRowIndexes:selectedRows byExtendingSelection:NO];
        }
    });
 }
#pragma mark TableView datasource

- (NSInteger)numberOfRowsInTableView:(NSTableView *)tableView NS_SWIFT_UI_ACTOR
{
    return [self.allItemsItems count];
}

- (nullable id)tableView:(NSTableView *)tableView objectValueForTableColumn:(nullable NSTableColumn *)tableColumn row:(NSInteger)row
{
    Item *item = [self.allItemsItems objectAtIndex:row];
    NSString *text = item.text;
    return text;
}

- (void)tableView:(NSTableView *)tableView setObjectValue:(nullable id)object forTableColumn:(nullable NSTableColumn *)tableColumn row:(NSInteger)row
{
    Item *item = [self.allItemsItems objectAtIndex:row];
    NSString *newString = (NSString *)object;
    item.text = newString;
    [self itemDidChange:item];
}


#pragma mark -

- (void)itemDidChange:(Item *)anItem
{
    if (anItem.itemId == NSNotFound)
    {
        [WebApi.shared addItem:anItem withCompletionHandler:
            ^(NSError * _Nullable error)
            {
                //TODO: represent error
                [self updateItems];
            }];
    }
    else
    {
        [WebApi.shared setItem:anItem withCompletionHandler:
            ^(NSError * _Nullable error)
            {
                if (error)
                {
                    //TODO: represent error
                }
            }];
    }
}

- (IBAction)delete:(nullable id)sender
{
    NSIndexSet *selectedIndexes = self.allItemsTable.selectedRowIndexes;

    NSMutableArray *indexesArray = [NSMutableArray array];

    [selectedIndexes enumerateIndexesUsingBlock:
        ^(NSUInteger idx, BOOL * _Nonnull stop)
        {
            Item *item = [self.allItemsItems objectAtIndex:idx];
            if (item.itemId != NSNotFound)
            {
                [indexesArray addObject:[NSNumber numberWithInteger:item.itemId]];
            }
        }];

    if (indexesArray.count)
    {
        [WebApi.shared deleteItems:indexesArray withCompletionHandler:
            ^(NSError * _Nullable error)
            {
                //TODO: represent error
                [self updateItems];
        }];
    }
}


@end
