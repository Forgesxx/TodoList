//
//  PreferencesController.h
//  LangSwap
//
//  Created by Danil Korotenko on 7/2/22.
//

#import <Foundation/Foundation.h>
#import <Cocoa/Cocoa.h>

NS_ASSUME_NONNULL_BEGIN

extern NSString *const CurrentServerDidChangeNotification;

@interface Preferences : NSObject

+ (Preferences *)shared;

@property (readwrite) NSURL *currentServer;
@property (readwrite) NSArray *servers;

@property (readwrite) NSTimeInterval updateInterval;

- (void)clearSettings;

@end

NS_ASSUME_NONNULL_END
