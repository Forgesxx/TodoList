//
//  PreferencesWindowController.m
//  TurboSwitcher
//
//  Created by Danil Korotenko on 6/28/22.
//

#import "PreferencesWindowController.h"
#import "PreferencesGeneralTabView.h"
#import "Preferences.h"

@interface PreferencesWindowController ()

@property(strong) IBOutlet NSTabView *tabView;

@end

@implementation PreferencesWindowController

// singleton implementation
+ (PreferencesWindowController *)sharedController
{
    static PreferencesWindowController *sharedController = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken,
    ^{
        sharedController = [[PreferencesWindowController alloc] init];
    });
    return sharedController;
}

- (instancetype)init
{
    self = [super initWithWindowNibName:@"PreferencesWindow"];
    if (self)
    {
        [self window]; // load window
    }
    return self;
}

- (void)awakeFromNib
{
    PreferencesGeneralTabView *generalTabController =
        [[PreferencesGeneralTabView alloc]
        initWithNibName:@"PreferencesGeneralTabView"
        bundle:[NSBundle mainBundle]];

    NSTabViewItem *generalTab =
        [NSTabViewItem tabViewItemWithViewController:generalTabController];
    generalTab.label = NSLocalizedString(@"General", nil);

    [self.tabView addTabViewItem:generalTab];
}

@end
