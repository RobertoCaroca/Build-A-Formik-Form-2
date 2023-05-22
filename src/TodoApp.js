import React, { useState } from 'react';
import { Formik, useField, FieldArray, Form } from 'formik';
import './index.css';

const INITIAL_TODOS = [
  { id: 1, content: "learn react", responsible: "John Doe", isCompleted: true },
  { id: 2, content: "learn react hooks", responsible: "Jane Smith", isCompleted: true },
  { id: 3, content: "learn formik", responsible: "David Johnson", isCompleted: false }
];

const TodoItem = ({ values, index, isEditing, setEditing }) => {
  const [completedField, , completedHelpers] = useField({ name: `todos[${index}].isCompleted`, type: "checkbox" });
  const [contentField, contentMeta, contentHelpers] = useField(`todos[${index}].content`);
  const [responsibleField, responsibleMeta, responsibleHelpers] = useField(`todos[${index}].responsible`);

  const onContentInput = e => {
    contentHelpers.setValue(e.currentTarget.innerText);
  };

  const onContentBlur = () => {
    contentHelpers.setTouched(true);
  };

  return (
    <div className={`todo-item ${completedField.value ? "completed" : ""}`}>
      <div className="todo-item-row">
        <div className="todo-details">
          <input
            className="form-check-input"
            type="checkbox"
            name={completedField.name}
            checked={completedField.value}
            onChange={({ target }) => {
              completedHelpers.setValue(target.checked);
              completedHelpers.setTouched(true);
            }}
          />
          {isEditing === index ? (
            <>
              <input
                className="form-control todo-input"
                value={contentField.value}
                onChange={e => contentHelpers.setValue(e.target.value)}
              />
              <input
                className="form-control todo-input"
                value={responsibleField.value}
                onChange={e => responsibleHelpers.setValue(e.target.value)}
              />
            </>
          ) : (
            <>
              <label
                className={`form-check-label todo-label ${completedField.value ? "completed" : ""}`}
                contentEditable={true}
                onInput={onContentInput}
                onBlur={onContentBlur}
              >
                {contentField.value}
              </label>
              <label className="form-check-label todo-label">{responsibleField.value}</label>
            </>
          )}
        </div>
        <div className="todo-actions">
          <button
            className="btn btn-primary"
            onClick={() => setEditing(isEditing !== index ? index : null)}
          >
            {isEditing === index ? 'Save' : 'Edit'}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setEditing(null)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const TodoApp = () => {
  const [isEditing, setEditing] = useState(null);

  return (
    <Formik
      initialValues={{
        todos: INITIAL_TODOS,
        newTask: '',
        responsible: ''
      }}
      onSubmit={(values, { resetForm }) => {
        const { todos, newTask, responsible } = values;
        const newTodo = {
          id: todos.length + 1,
          content: newTask,
          responsible: responsible,
          isCompleted: false
        };
        resetForm({
          todos: [...todos, newTodo],
          newTask: '',
          responsible: ''
        });
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="form-row align-items-center">
            <div className="col">
              <input
                type="text"
                name="newTask"
                value={values.newTask}
                onChange={handleChange}
                className="form-control"
                placeholder="Task"
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="responsible"
                value={values.responsible}
                onChange={handleChange}
                className="form-control"
                placeholder="Responsible"
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">
                Add Item
              </button>
            </div>
          </div>
          <FieldArray name="todos">
            {({ remove }) => (
              <div className="todo-list">
                {values.todos.map((todo, index) => (
                  <div key={todo.id}>
                    <TodoItem
                      values={values}
                      index={index}
                      isEditing={isEditing}
                      setEditing={setEditing}
                    />
                  </div>
                ))}
              </div>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default TodoApp;