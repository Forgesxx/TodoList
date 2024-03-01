//
//  Document.h
//  TodoListApp
//
//  Created by Danil Korotenko on 2/29/24.
//

#import <Cocoa/Cocoa.h>

#import "ItemTableCellView.h"

@interface Document : NSDocument<
    NSURLSessionDelegate,
    ItemTableCellViewDelegate>


@end

