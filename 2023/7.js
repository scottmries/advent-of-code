const { readFileSync } = require('fs')

const hands = readFileSync('7.txt').toString().split("\n")

let cardRank = (s) => {
    if (withJokers) {
        return Number(s) ? Number(s) - 1 : {'T': 9, 'J': 0, 'Q': 10, 'K': 11, 'A': 12}[s]
    }
    return Number(s) ? Number(s) - 2 : {'T': 8, 'J': 9, 'Q': 10, 'K': 11, 'A': 12}[s]
}

const compareSameRankedHands = (h1, h2) => {
    for (let i = 0; i < h1.length; i++) {
        if (h1[i] !== h2[i]) {
            return cardRank(h1[i]) - cardRank(h2[i])
        }
    }
}

const handRank = {
    'HC': 0,
    '1P': 1,
    '2P': 2,
    '3K': 3,
    'FH': 4,
    '4K': 5,
    '5K': 6
}

let withJokers = false

const handType = (h) => {
    let jokers
    if (withJokers) {
        h = h.split("").filter(c => c !== 'J').join("")
        jokers = 5 - h.length
    }
    const cardCount = h.split("").reduce((accumulator, card) => {
        accumulator[card] = accumulator[card] ? accumulator[card] + 1 : 1
        return accumulator
    }, {})
    const occurences = Object.values(cardCount)
    occurences.sort((a, b) => b - a)
    if (withJokers) {
        // edge case for a JJJJJ hand
        occurences[0] = occurences[0] ? occurences[0] + jokers : 5
    }
    switch (occurences[0]) {
        case 5:
            return '5K'
        case 4:
            return '4K'
        case 3:
            return occurences[1] === 2 ? 'FH' : '3K'
        case 2:
            return occurences[1] === 2 ? '2P' : '1P'
        default:
            return 'HC'
    }
}

const rankHands = (hands) => {
    let handRanks = hands.map(set => {
        let [hand, bet] = set.split(" ")
        bet = Number(bet)
        const rank = handRank[handType(hand)]
        return {hand, rank, bet}
    })
    
    handRanks.sort((h1, h2) => {
        if (h1.rank !== h2.rank) {
            return h1.rank - h2.rank
        }
        return compareSameRankedHands(h1.hand, h2.hand)
    })

    return handRanks
}

const getResult = () => {
    return rankHands(hands).reduce((accumulator, hand, index) => {
        return accumulator + (index + 1) * hand.bet
    }, 0)
}

console.log(getResult())

withJokers = true

console.log(getResult())