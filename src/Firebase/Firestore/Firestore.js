import * as firebase from "firebase/app";
import "firebase/firestore";

const db = () => {
    if (firebase.apps.length) {
        return firebase.firestore()
    }
}

export const writePoint = (user, p) => {
    console.log("lat, long", p.lat(), p.lng());
    
    let geopt = new firebase.firestore.GeoPoint(p.lat(), p.lng())
    console.log("geopt", geopt);
    
    db().collection("geography").doc(user).collection("points").add({
        point: geopt
    }).then((doc) => { console.log("docid", doc.id);
    }).catch((e) => console.log("error", e))
}

export const getPoints = (user, loadPoints) => {
    console.log("getPoints", user)
    if (user) {
        db().collection("geography").doc(user).collection("points").get()
        .then((res) => {
            let data = []
            res.forEach(d => data.push(d.data()))
            console.log("data", data);
            loadPoints(data)
        })
        .catch((err) => {
            console.log(err)
            return null
        })
    }
}