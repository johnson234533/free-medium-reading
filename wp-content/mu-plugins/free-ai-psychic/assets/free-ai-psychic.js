/* Локальний сценарій: дані запитання не передаються мережею. */
document.querySelectorAll('.faip-tool').forEach((tool) => {
  const step = (name) => tool.querySelector(`[data-step="${name}"]`);
  const result = tool.querySelector('.faip-result');
  const question = tool.querySelector('textarea');
  let topic = '';

  const cards = {
    star: { title: 'The Star', thought: 'Hope can be useful when it points to a concrete next step. Notice where possibility still feels alive, even if the outcome is uncertain.' },
    moon: { title: 'The Moon', thought: 'Uncertainty may be asking for patience. Separate what you know from what you fear or imagine before choosing your next move.' },
    sun: { title: 'The Sun', thought: 'Clarity often begins with naming what already works. Look for one honest conversation or small action that could bring more light.' }
  };
  const prompts = {
    general: {
      love: 'What could you ask directly instead of guessing what someone else feels?',
      work: 'Which choice gives you more room to grow over the next few months?',
      self: 'What small habit would support the version of yourself you want to become?',
      memory: 'Which memory deserves care without needing a definite explanation?'
    },
    medium: {
      love: 'What would it mean to carry a relationship forward in your actions?',
      work: 'Which value from someone important could guide your next decision?',
      self: 'What form of remembrance feels gentle and sustainable today?',
      memory: 'What ordinary detail best captures the person or moment you remember?'
    },
    chat: {
      love: 'What one question would make a conversation with a real reader more useful?',
      work: 'What facts should you bring into a career conversation before asking for insight?',
      self: 'What pattern are you ready to examine without judging yourself?',
      memory: 'What would you like to understand about this recurring thought?'
    },
    love: {
      love: 'What do you need from this relationship that you can express clearly?',
      work: 'How does this work decision affect the time and care you give to love?',
      self: 'Which boundary would help you feel more secure in connection?',
      memory: 'What has a past relationship taught you about the love you want now?'
    }
  };

  tool.querySelectorAll('[data-topic]').forEach((button) => button.addEventListener('click', () => {
    topic = button.dataset.topic;
    step('topic').hidden = true;
    step('question').hidden = false;
    question.focus();
  }));
  tool.querySelector('.faip-next').addEventListener('click', () => {
    if (!question.value.trim()) {
      question.setCustomValidity('Write a short question first.');
      question.reportValidity();
      return;
    }
    question.setCustomValidity('');
    step('question').hidden = true;
    step('card').hidden = false;
    step('card').querySelector('button').focus();
  });
  question.addEventListener('input', () => question.setCustomValidity(''));
  tool.querySelectorAll('[data-card]').forEach((button) => button.addEventListener('click', () => {
    const card = cards[button.dataset.card];
    step('card').hidden = true;
    tool.querySelector('.faip-card-title').textContent = card.title;
    tool.querySelector('.faip-reading').textContent = card.thought;
    tool.querySelector('.faip-prompt').textContent = prompts[tool.dataset.mode][topic];
    result.hidden = false;
    result.querySelector('.faip-cta').focus();
  }));
  tool.querySelector('.faip-restart').addEventListener('click', () => {
    topic = '';
    question.value = '';
    result.hidden = true;
    step('topic').hidden = false;
    step('topic').querySelector('button').focus();
  });
});
