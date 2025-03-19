const Notification = ({ notification }) => {
    if (notification[0] === null) {
        return null
    }
    if (notification[1] === 'notification') {
        return <div className="notification">{notification[0]}</div>
    }
    if (notification[1] === 'error') {
        return <div className="error">{notification[0]}</div>
    }
}

export default Notification