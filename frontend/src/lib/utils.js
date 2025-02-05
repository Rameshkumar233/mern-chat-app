export const formatMessageTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

export const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
        const dateKey = new Date(message.createdAt).toLocaleDateString();
        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }
        groups[dateKey].push(message);
        return groups;
    }, {});
};
