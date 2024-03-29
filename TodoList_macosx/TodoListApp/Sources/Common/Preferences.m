//
//  PreferencesController.m
//  LangSwap
//
//  Created by Danil Korotenko on 7/2/22.
//

#import "Preferences.h"

NSString *const CurrentServerDidChangeNotification = @"CurrentServerDidChangeNotification";

static NSString * const kServersFileName = @"servers";

static NSString * const kCurrentServer = @"current";
static NSString * const kServers = @"servers";

static NSString * const kUpdateInterval = @"updateInterval";

@interface Preferences ()

@end

@implementation Preferences

// singleton implementation
+ (Preferences *)shared
{
    static Preferences *sharedController = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken,
    ^{
        sharedController = [[Preferences alloc] init];
    });
    return sharedController;
}

- (instancetype)init
{
    self = [super init];
    if (self)
    {
        [self loadResources];
    }
    return self;
}

- (void)loadResources
{
    NSDictionary *servers =
        [self getDictionaryFromBundleResourcesWithName:
        kServersFileName];

    if (servers != nil)
    {
        if (self.currentServer == nil)
        {
            self.currentServer = [NSURL URLWithString:[servers objectForKey:kCurrentServer]];
        }

        NSArray *serversURLs = [servers objectForKey:kServers];

        NSMutableArray *newServers = [NSMutableArray array];

        NSArray *selfServers = self.servers;
        if (selfServers != nil)
        {
            newServers = [NSMutableArray arrayWithArray:selfServers];
        }

        for (NSString *serverURL in serversURLs)
        {
            if (![newServers containsObject:serverURL])
            {
                [newServers addObject:serverURL];
            }
        }

        self.servers = newServers;
    }
}

#pragma mark -

- (NSArray *)getArrayFromBundleResourcesWithName:(NSString *)aResourceName
{
    NSBundle *bundle = [NSBundle bundleForClass:[self class]];
    NSString *filePath = [bundle pathForResource:aResourceName
        ofType:@"plist"];
    NSArray *arrayFromFile = [NSArray arrayWithContentsOfFile:filePath];
    return arrayFromFile;
}

- (NSDictionary *)getDictionaryFromBundleResourcesWithName:(NSString *)aResourceName
{
    NSBundle *bundle = [NSBundle bundleForClass:[self class]];
    NSString *filePath = [bundle pathForResource:aResourceName
        ofType:@"plist"];
    NSDictionary *dictionaryFromFile = [NSDictionary dictionaryWithContentsOfFile:filePath];
    return dictionaryFromFile;
}

#pragma mark -

- (NSURL *)currentServer
{
    return [[NSUserDefaults standardUserDefaults] URLForKey:kCurrentServer];
}

- (void)setCurrentServer:(NSURL *)aCurrentServer
{
    if(self.currentServer != aCurrentServer)
    {
        [[NSUserDefaults standardUserDefaults] setURL:aCurrentServer forKey:kCurrentServer];
        [[NSNotificationCenter defaultCenter] postNotificationName:CurrentServerDidChangeNotification
            object:nil];
    }
}

- (NSArray *)servers
{
    return [[NSUserDefaults standardUserDefaults] arrayForKey:kServers];
}

- (void)setServers:(NSArray *)aServers
{
    return [[NSUserDefaults standardUserDefaults] setObject:aServers forKey:kServers];
}

#pragma mark -

- (NSTimeInterval)updateInterval
{
    CGFloat updateInterval = [[NSUserDefaults standardUserDefaults] floatForKey:kUpdateInterval];
    if (updateInterval == 0)
    {
        updateInterval = 5;
    }
    return updateInterval;
}

- (void)setUpdateInterval:(NSTimeInterval)updateInterval
{
    [[NSUserDefaults standardUserDefaults] setFloat:updateInterval forKey:kUpdateInterval];
}

#pragma mark -

- (void)clearSettings
{
    NSDictionary * dict = [[NSUserDefaults standardUserDefaults] dictionaryRepresentation];
    for (id key in dict)
    {
        [[NSUserDefaults standardUserDefaults] removeObjectForKey:key];
    }
    [[NSUserDefaults standardUserDefaults] synchronize];
}

@end
