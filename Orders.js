import React, { useEffect, useState } from 'react';
import './Orders.css';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'; // Correct Firestore imports
import { useStatevalue } from './StateProvider';
import Order from './Order';

function Orders() {
    const [{ user }] = useStatevalue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            // Create a reference to the user's orders collection
            const ordersRef = collection(db, 'users', user?.uid, 'orders');

            // Set up the query to order the orders by the 'created' timestamp
            const q = query(ordersRef, orderBy('created', 'desc'));

            // Listen for real-time updates using onSnapshot
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setOrders(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });

            // Clean up the listener on unmount
            return () => unsubscribe();
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders_order"> 
                {orders?.map((order) => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    );
}

export default Orders;
