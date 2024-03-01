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
    [self.allItemsTable registerNib:[[NSNib alloc] initWithNibNamed:@"ItemTableCellView"
        bundle:[NSBundle mainBundle]] forIdentifier:@"item"];
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
    return [self.allItems count];
}

- (nullable NSView *)tableView:(NSTableView *)tableView viewForTableColumn:(nullable NSTableColumn *)tableColumn row:(NSInteger)row
{
    ItemTableCellView *tableCellView = nil;

    Item *item = [Item itemWithDictionary:[self.allItems objectAtIndex:row]];

    if (row < self.allItemViews.count)
    {
        tableCellView = [self.allItemViews objectAtIndex:row];
    }
    else
    {
        tableCellView = [tableView makeViewWithIdentifier:tableColumn.identifier owner:nil];
        tableCellView.delegate = self;
        [self.allItemViews addObject:tableCellView];
    }

    [tableCellView representItem:item];

    return tableCellView;
}

#pragma mark -

- (void)itemDidChange:(Item *)anItem
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

@end
