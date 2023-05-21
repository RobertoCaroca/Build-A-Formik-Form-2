import { Form, Formik, FieldArray, useField } from "formik";

const INITIAL_TODOS = [
  { id: 1, content: "learn react", isCompleted: true },
  { id: 2, content: "learn react hooks", isCompleted: true },
  { id: 3, content: "learn formik", isCompleted: false },
];

const TodoItem = ({ index }) => {
  const [completedField, , completedHelpers] = useField({ name: `todos[${index}].isCompleted`, type: "checkbox" });
  const [contentField, contentMeta, contentHelpers] = useField(`todos[${index}].content`);
  
  const onContentInput = e => {
    contentHelpers.setValue(e.currentTarget.innerText);
  };

  const onContentBlur = () => {
    contentHelpers.setTouched(true);
  };

  return (
    <div className={["todo-item", completedField.value ? "completed" : ""].join(" ")}>
      <input
        type="checkbox"
        name={completedField.name}
        checked={completedField.value}
        onChange={({ target }) => {
          completedHelpers.setValue(target.checked);
          completedHelpers.setTouched(true);
        }}
      />
      <span
        contentEditable={true}
        className="todo-text"
        onInput={onContentInput}
        onBlur={onContentBlur}
      >
        {contentField.value}
      </span>
    </div>
  );
};

export const TodoApp = () => (
  <Formik initialValues={{ todos: INITIAL_TODOS }}>
    <Form>
      <FieldArray name="todos">
        {({ form, ...fieldArrayHelpers }) => {
          const onAddClick = () => {
            fieldArrayHelpers.push({
              id: form.values.todos.length,
              content: "",
              isCompleted: false,
            });
          };
          const onRemoveClick = () => {
            form.setFieldValue(
              "todos",
              form.values.todos.filter(todo => !todo.isCompleted)
            );
          };

          return (
            <React.Fragment>
              <button onClick={onAddClick}>Add Item</button>
              <button onClick={onRemoveClick}>Remove Completed</button>
              {form.values.todos.map(({ id }, index) => (
                <TodoItem key={id} index={index} />
              ))}
            </React.Fragment>
          );
        }}
      </FieldArray>
    </Form>
  </Formik>
);
