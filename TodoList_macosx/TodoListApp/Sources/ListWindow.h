//
//  ListWindow.h
//  TodoListApp
//
//  Created by Danil Korotenko on 3/3/24.
//

#import <Cocoa/Cocoa.h>

NS_ASSUME_NONNULL_BEGIN

@interface ListWindow : NSWindowController<NSTableViewDelegate, NSTableViewDataSource>

+ (ListWindow *)sharedController;

@end

NS_ASSUME_NONNULL_END
