const Room = require('../models/Room');

module.exports = async (io) => {
    io.on('connection', async socket => {
        socket.on('connectToRoom', (data) => {
            socket.join(data.room);
        });
        socket.on('sendMessage', async data => {
            const room = await Room.findOne({ _id: data.room });

            const message = {
              message: data.message,
              from: data.user
            };

            room.messages.push(message);
            room.save();

            io.to(data.room).emit('message', {user: data.user, message: data.message});
        });
    })
}