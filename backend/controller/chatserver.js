export default async function chatServer(io) {
    io.on('connection', (socket) => {
        socket.on('message', (data)=>{
            // const senderData= await validateUserId({email: data.senderemail})
            // const receriverData= await validateUserId({email: data.email})
            io.emit('add_user', data)
        })
        socket.on("text", (chat)=>{
            console.log("New Chat=>",chat)
        })
    })
}