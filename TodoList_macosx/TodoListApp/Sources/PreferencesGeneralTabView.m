//
//  PreferencesGeneralTabView.m
//  LangSwap
//
//  Created by Danil Korotenko on 7/2/22.
//

#import "PreferencesGeneralTabView.h"
#import "Preferences.h"

@interface PreferencesGeneralTabView ()

@property (strong) IBOutlet NSTextField *refreshFrequency;
@property (strong) IBOutlet NSStepper *refreshFrequencyStepper;

@property (strong) IBOutlet NSTextField *currentServer;

@end

@implementation PreferencesGeneralTabView

- (void)awakeFromNib
{
    [self updateUI];
}

#pragma mark -

- (void)updateUI
{
    NSNumber *refreshFrequency = [NSNumber numberWithFloat:Preferences.shared.updateInterval];
    self.refreshFrequency.stringValue = [refreshFrequency stringValue];
    self.refreshFrequencyStepper.integerValue = [refreshFrequency intValue];

    self.currentServer.stringValue =  Preferences.shared.currentServer.absoluteString;
}

#pragma mark -

- (IBAction)stepperDidClick:(id)sender
{
    NSInteger stepperValue = self.refreshFrequencyStepper.integerValue;
    NSNumber *refreshFrequency = [NSNumber numberWithInteger:stepperValue];
    Preferences.shared.updateInterval = [refreshFrequency floatValue];
    [self updateUI];
}

#pragma mark Table View delegate data source

- (NSInteger)numberOfRowsInTableView:(NSTableView *)tableView
{
    return Preferences.shared.servers.count;
}

- (id)tableView:(NSTableView *)tableView
    objectValueForTableColumn:(NSTableColumn *)tableColumn
    row:(NSInteger)row
{
    return [Preferences.shared.servers objectAtIndex:row];
}

@end
