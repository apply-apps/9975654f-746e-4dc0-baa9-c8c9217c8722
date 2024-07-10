// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Message = () => {
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get('http://apihub.p.appply.xyz:3300/motd');
                setMessage(response.data.message);
            } catch (error) {
                setMessage('Failed to load message.');
            } finally {
                setLoading(false);
            }
        };

        fetchMessage();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    messageContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginHorizontal: 10,
        marginTop: 20,
    },
    messageText: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Message of the Day</Text>
            <Message />
        </SafeAreaView>
    );
}