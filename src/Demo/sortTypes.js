export const sortTypes = {
    asc: {
        sortFunc: (a, b) => a.net_worth - b.net_worth
    },
    desc: {
        sortFunc: (a, b) => b.net_worth - a.net_worth
    },
    default: {
        sortFunc: (a, b) => a
    }
};