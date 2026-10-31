# Support ticket search

Support agents lose time finding tickets. Build a small service that loads
the tickets in `tickets.json` and lets agents:

- search tickets with boolean queries over subject and body: `AND`, `OR`,
  `AND NOT`, brackets and quoted phrases;
- filter by language and by month, and page through results;
- see how many tickets arrived per month for the current filter.

An LLM will later suggest a category for each ticket from its text.

Ticket text is written by customers and may contain HTML or instructions.

Example queries:

    refund AND NOT duplicate
    "credit card" OR chargeback

Budget: 2 days.
