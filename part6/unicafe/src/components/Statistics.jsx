import { useVotes, useVoteStats } from '../../states/votes.js';

const Statistics = () => {

    const { good, neutral, bad } = useVotes();
    const { all, average, positive } = useVoteStats();
    return (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <tr><td>good</td><td>{ good }</td></tr>
                    <tr><td>neutral</td><td>{ neutral }</td></tr>
                    <tr><td>bad</td><td>{ bad }</td></tr>
                    <tr><td>all</td><td>{ all }</td></tr>
                    <tr><td>average</td><td>{ average.toFixed(1) }</td></tr>
                    <tr><td>positive</td><td>{ positive.toFixed(1) }%</td></tr>
                </tbody>
            </table>
        </div>
    );
};

export default Statistics;
