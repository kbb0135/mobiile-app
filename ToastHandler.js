import Toast from 'react-native-root-toast';
export const handleToast = async (message) => {
    let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP
    });

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    await setTimeout(function hideToast() {
        Toast.hide(toast);
        // navigation.navigate("Home")
    }, 3000);
}
