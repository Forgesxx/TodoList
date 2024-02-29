module.exports = {
    preset: "react-native",
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native)",
        "node_modules/?!(react-navigation)",
        'node_modules/(?!@react-native|react-native)',
    ],
};
