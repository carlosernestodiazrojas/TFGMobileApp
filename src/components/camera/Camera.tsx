/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
    CameraType,
    CameraView,
    useCameraPermissions
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";

interface CameraComponentProps {
    onImageCaptured?: (uri: string | null) => void;
    onClose?: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
    onImageCaptured,
    onClose
}) => {
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | null>(null);
    const [facing, setFacing] = useState<CameraType>("back");

    if (!permission) {
        return null;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    Necesitamos tu permiso para usar la cámara
                </Text>
                <Button onPress={requestPermission} title="Conceder permiso" />
            </View>
        );
    }

    const takePicture = async () => {
        try {

            const photo = await ref.current?.takePictureAsync({
                quality: 0.8,
                base64: false,
                skipProcessing: false,
            });

            setUri(photo?.uri ?? null);
        } catch (error) {
            console.error('Error taking picture:', error);
        }
    };

    const toggleFacing = () => {
        setFacing((prev) => (prev === "back" ? "front" : "back"));
    };

    const usePhoto = () => {
        if (onImageCaptured) {
            onImageCaptured(uri);
        }
    };

    const discardPhoto = () => {
        setUri(null);
    };

    const closeCamera = () => {
        if (onClose) {
            onClose();
        }
    };

    const renderPicture = () => {

        if (!uri) {

            return null;
        }
        return (
            <View style={styles.previewContainer}>

                <Text style={{ color: 'white', marginBottom: 10 }}>
                    Foto capturada
                </Text>
                <View style={{
                    width: 300,
                    height: 400,
                    backgroundColor: '#333',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 10,
                    overflow: 'hidden'
                }}>
                    <Image
                        source={{ uri }}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.previewActions}>
                    <Button
                        onPress={discardPhoto}
                        title="Descartar"
                        color="#ff6b6b"
                    />
                    <Button
                        onPress={usePhoto}
                        title="Usar foto"
                        color="#51cf66"
                    />
                </View>
            </View>
        );
    };

    const renderCamera = () => {
        return (
            <View style={styles.cameraContainer}>

                <CameraView
                    style={styles.camera}
                    ref={ref}
                    mode={'picture'}
                    facing={facing}
                    mute={false}
                    responsiveOrientationWhenOrientationLocked
                />

                <Pressable
                    style={styles.closeButton}
                    onPress={closeCamera}
                >
                    <AntDesign name="close" size={24} color="white" />
                </Pressable>

                <View style={styles.shutterContainer}>

                    <Pressable onPress={takePicture}>
                        {({ pressed }) => (
                            <View
                                style={[
                                    styles.shutterBtn,
                                    {
                                        opacity: pressed ? 0.5 : 1,
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.shutterBtnInner,
                                        {
                                            backgroundColor: "white",
                                        },
                                    ]}
                                />
                            </View>
                        )}
                    </Pressable>
                    <Pressable onPress={toggleFacing}>
                        <FontAwesome6 name="rotate-left" size={32} color="white" />
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {uri ? renderPicture() : renderCamera()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    cameraContainer: {
        flex: 1,
        width: "100%",
        position: "relative",
    },
    camera: {
        flex: 1,
        width: "100%",
    },
    closeButton: {
        position: "absolute",
        top: 50,
        right: 20,
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 20,
        padding: 10,
    },
    shutterContainer: {
        position: "absolute",
        bottom: 44,
        left: 0,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
    },
    shutterBtn: {
        backgroundColor: "transparent",
        borderWidth: 5,
        borderColor: "white",
        width: 85,
        height: 85,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    shutterBtnInner: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    previewContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        width: "100%",
        height: "100%",
    },
    previewImage: {
        width: 300,
        height: 400,
        borderRadius: 10,
        backgroundColor: '#333',
        borderWidth: 2,
        borderColor: 'white',
    },
    previewActions: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        marginTop: 20,
    },
});

export default CameraComponent;