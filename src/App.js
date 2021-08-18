import './App.css';
import { useState } from 'react';

const notes = [2000, 500, 100, 20, 10, 5, 1];

function App() {
	const [bill, setBill] = useState('');
	const [cash, setCash] = useState('');
	const [error, setError] = useState('');

	const [notes1, setNotes1] = useState(0);
	const [notes5, setNotes5] = useState(0);
	const [notes10, setNotes10] = useState(0);
	const [notes20, setNotes20] = useState(0);
	const [notes100, setNotes100] = useState(0);
	const [notes500, setNotes500] = useState(0);
	const [notes2000, setNotes2000] = useState(0);

	const handleClick = () => {
		//Reset fields.
		setNotes1(0);
		setNotes5(0);
		setNotes10(0);
		setNotes20(0);
		setNotes100(0);
		setNotes500(0);
		setNotes2000(0);

		// Error Handling
		if (!bill || !Number.isInteger(+bill)) {
			setError('Invalid bill amount');
			return;
		}

		if (!cash || !Number.isInteger(+cash)) {
			setError('Invalid cash amount');
			return;
		}

		const cashAmt = parseInt(cash);
		const billAmt = parseInt(bill);

		if (cashAmt < billAmt) {
			setError('You have to work at Restaurant xD');
			return;
		}

		// Notes calculation
		let remAmt = cashAmt - billAmt;
		for (let i = 0; i < notes.length && remAmt > 0; ++i) {
			let value = notes[i];

			let take = Math.floor(remAmt / value);
			remAmt -= take * value;

			if (i === 0) setNotes2000(take);
			else if (i === 1) setNotes500(take);
			else if (i === 2) setNotes100(take);
			else if (i === 3) setNotes20(take);
			else if (i === 4) setNotes10(take);
			else if (i === 5) setNotes5(take);
			else setNotes1(take);
		}
		setError('');
	};

	return (
		<main>
			<h1>Cash Register Application</h1>
			<p className='subheading'>
				Give the bill amount and cash given by customer to know Minimum
				Number of notes to return.
			</p>
			<label className='label' htmlFor='bill'>
				Enter the bill amount:
			</label>
			<input
				onChange={(event) => setBill(event.target.value)}
				type='text'
				id='bill'
			/>

			{bill ? (
				<>
					<label className='label' htmlFor='cash'>
						Enter the cash given:
					</label>
					<input
						onChange={(event) => setCash(event.target.value)}
						type='text'
						id='cash'
					/>
				</>
			) : (
				<></>
			)}

			<button onClick={handleClick}>Get Change</button>
			<div>{error}</div>
			<table>
				<caption>Return Change</caption>
				<tbody>
					<tr>
						<th>No of Notes</th>
						<td>{notes1}</td>
						<td>{notes5}</td>
						<td>{notes10}</td>
						<td>{notes20}</td>
						<td>{notes100}</td>
						<td>{notes500}</td>
						<td>{notes2000}</td>
					</tr>
					<tr>
						<th>Note</th>
						<td>1</td>
						<td>5</td>
						<td>10</td>
						<td>20</td>
						<td>100</td>
						<td>500</td>
						<td>2000</td>
					</tr>
				</tbody>
			</table>
		</main>
	);
}

export default App;
