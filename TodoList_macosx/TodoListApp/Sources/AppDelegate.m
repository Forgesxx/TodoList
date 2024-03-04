//
//  AppDelegate.m
//  TodoListApp
//
//  Created by Danil Korotenko on 2/29/24.
//

#import "AppDelegate.h"
#import "PreferencesWindowController.h"

@interface AppDelegate ()



@end

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{

}

- (void)applicationWillTerminate:(NSNotification *)aNotification
{

}

- (BOOL)applicationSupportsSecureRestorableState:(NSApplication *)app
{
    return YES;
}

- (IBAction)showPreferences:(id)sender
{
    [[PreferencesWindowController sharedController] showWindow:self];
}

- (IBAction)showList:(id)sender
{

}

@end
