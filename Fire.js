import firebase from "firebase";

class Fire {
    constructor() {
        this.init();
        this.checkAuth();
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBMBhZhKvHrzhY6SM1Yp0FL9C9ZyKbCoWs",
                authDomain: "chatapp-50b92.firebaseapp.com",
                databaseURL: "https://chatapp-50b92.firebaseio.com",
                projectId: "chatapp-50b92",
                storageBucket: "chatapp-50b92.appspot.com",
                messagingSenderId: "404024427784",
                appId: "1:404024427784:web:3bfd174252d5fde49298bd",
                measurementId: "G-YP6RXWVEWV"
            });
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off();
    }

    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();
