//
//  PreferencesWindowController.h
//  TurboSwitcher
//
//  Created by Danil Korotenko on 6/28/22.
//

#import <Cocoa/Cocoa.h>

NS_ASSUME_NONNULL_BEGIN

@interface PreferencesWindowController : NSWindowController<
    NSTabViewDelegate, NSWindowDelegate>

+ (PreferencesWindowController *)sharedController;

@end

NS_ASSUME_NONNULL_END
