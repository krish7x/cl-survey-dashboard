export const surveyJson = [
    {
      title: "Based  your shopping experience, how likely are you to recommend CaratLane to your friend and family (on a scale of 1 to 10)?",
      isAdded: true,
      description: "Description of question 1",
      optionTypeId: 1,
      optionTypeName: "NPS Rating",
    },
    {
      title: "How was you experience in caratlane",
      isAdded: true,
      description: "Description of question 2",
      optionTypeId: 2,
      optionTypeName: "Star Rating",
    },
    {
      title: "What do you liked about the product",
      isAdded: true,
      description: "Description of question 3",
      optionsJson: {
        options: [
          { id: 1, name: "Option 10" },
          { id: 2, name: "Option 2" },
          { id: 3, name: "Option 3" },
          { id: 4, name: "Option 4" },
        ],
        optionPosition: "x",
      },
      optionTypeId: 3,
      optionTypeName: "Multiple choice - Single Select",
    },
    {
      title: "Will you the product again from caratlane",
      isAdded: true,
      description: "Description of question 4",
      optionsJson: {
        options: [
          { id: 1, name: "Option 10" },
          { id: 2, name: "Option 2" },
          { id: 3, name: "Option 3" },
          { id: 4, name: "Option 4" },
        ],
        optionPosition: "y",
      },
      optionTypeId: 4,
      optionTypeName: "Multiple choice - multi select",
    },
  ];
  