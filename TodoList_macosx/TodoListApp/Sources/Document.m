//
//  Document.m
//  TodoListApp
//
//  Created by Danil Korotenko on 2/29/24.
//

#import "Document.h"
#import "WebApi.h"

@interface Document ()

@property (strong) IBOutlet NSTableView *allItemsTable;

@end

@implementation Document

- (instancetype)init
{
    self = [super init];
    if (self)
    {
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
    [self updateUI];
}

#pragma mark -

- (void)updateUI
{
    [[WebApi shared] getAllItemsWithCompletionHandler:
        ^(NSArray * _Nullable allItems, NSError * _Nullable error)
        {
            if (error)
            {
                //TODO: represent error
                return;
            }

            if (allItems)
            {

            }
        }];

}

@end
