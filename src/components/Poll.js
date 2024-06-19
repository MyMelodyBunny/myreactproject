import React, { useState } from 'react';

const Poll = () => {
  const [polls, setPolls] = useState([
    {
      question: 'What is your favorite programming language?',
      options: ['JavaScript', 'Python', 'Java', 'C#', 'Other'],
      selectedOption: '',
      otherOption: '',
      submitted: false,
      votes: { 'JavaScript': 0, 'Python': 0, 'Java': 0, 'C#': 0, 'Other': 0, 'OtherText': [] },
    },
    {
      question: 'Which framework do you prefer?',
      options: ['React', 'Vue', 'Angular', 'Svelte', 'Other'],
      selectedOption: '',
      otherOption: '',
      submitted: false,
      votes: { 'React': 0, 'Vue': 0, 'Angular': 0, 'Svelte': 0, 'Other': 0, 'OtherText': [] },
    },
    {
      question: 'What is your favorite database?',
      options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Other'],
      selectedOption: '',
      otherOption: '',
      submitted: false,
      votes: { 'MySQL': 0, 'PostgreSQL': 0, 'MongoDB': 0, 'SQLite': 0, 'Other': 0, 'OtherText': [] },
    },
    {
      question: 'Which operating system do you use the most?',
      options: ['Windows', 'macOS', 'Linux', 'Other'],
      selectedOption: '',
      otherOption: '',
      submitted: false,
      votes: { 'Windows': 0, 'macOS': 0, 'Linux': 0, 'Other': 0, 'OtherText': [] },
    },
    {
      question: 'Which code editor do you prefer?',
      options: ['VSCode', 'Sublime Text', 'Atom', 'Vim', 'Other'],
      selectedOption: '',
      otherOption: '',
      submitted: false,
      votes: { 'VSCode': 0, 'Sublime Text': 0, 'Atom': 0, 'Vim': 0, 'Other': 0, 'OtherText': [] },
    },
  ]);

  const handleOptionChange = (pollIndex, option) => {
    const newPolls = [...polls];
    newPolls[pollIndex].selectedOption = option;
    if (option !== 'Other') {
      newPolls[pollIndex].otherOption = ''; // Clear other option if not selected
    }
    setPolls(newPolls);
  };

  const handleOtherOptionChange = (pollIndex, value) => {
    const newPolls = [...polls];
    newPolls[pollIndex].otherOption = value;
    setPolls(newPolls);
  };

  const handleSubmit = (e, pollIndex) => {
    e.preventDefault();
    const newPolls = [...polls];
    if (newPolls[pollIndex].selectedOption) {
      newPolls[pollIndex].submitted = true;
      if (newPolls[pollIndex].selectedOption === 'Other') {
        newPolls[pollIndex].votes['Other'] += 1;
        newPolls[pollIndex].votes['OtherText'].push(newPolls[pollIndex].otherOption);
      } else {
        newPolls[pollIndex].votes[newPolls[pollIndex].selectedOption] += 1;
      }
      setPolls(newPolls);
      // Log the poll results to the console
      console.log(`Results for: ${newPolls[pollIndex].question}`);
      console.log(newPolls[pollIndex].votes);
    } else {
      alert('Please select an option before submitting.');
    }
  };

  return (
    <div className="Poll">
      <h2>Poll</h2>
      {polls.map((poll, pollIndex) => (
        <div key={pollIndex}>
          <p>{poll.question}</p>
          <form onSubmit={(e) => handleSubmit(e, pollIndex)}>
            {poll.options.map((option, optionIndex) => (
              <div key={optionIndex} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`pollOption${pollIndex}`}
                  id={`option${pollIndex}${optionIndex}`}
                  value={option}
                  onChange={() => handleOptionChange(pollIndex, option)}
                  disabled={poll.submitted}
                />
                <label className="form-check-label" htmlFor={`option${pollIndex}${optionIndex}`}>
                  {option}
                </label>
              </div>
            ))}
            {poll.selectedOption === 'Other' && !poll.submitted && (
              <div className="form-group">
                <label htmlFor={`otherOption${pollIndex}`}>Please specify:</label>
                <input
                  type="text"
                  className="form-control"
                  id={`otherOption${pollIndex}`}
                  value={poll.otherOption}
                  onChange={(e) => handleOtherOptionChange(pollIndex, e.target.value)}
                  disabled={poll.submitted}
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary" disabled={poll.submitted}>
              {poll.submitted ? 'Submitted' : 'Submit'}
            </button>
          </form>
          {poll.submitted && <p>Thank you for your vote!</p>}
        </div>
      ))}
    </div>
  );
};

export default Poll;
