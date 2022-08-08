import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { server } from './mocks/server';
import { handlers } from './mocks/handlers';
import App from './App';
test('renders the application', () => {
  render(<App />);
});
test('renders 2 buttons', () => {
  render(<App />);
  const app=screen.getAllByTestId("button-test");
  expect(app[0]).toBeInTheDocument();
  expect(app[1]).toBeInTheDocument();
  
});
test('check text of 2 buttons', () => {
  render(<App />);
  const app=screen.getAllByTestId("button-test");  
  expect(app[0]).toBeInTheDocument();
  expect(app[1]).toBeInTheDocument();
  expect(app[0]).toHaveTextContent("Get Short Link");
  expect(app[1]).toHaveTextContent("Clear URL");
});
test('check container of input field', () => {
  render(<App />);
  const app=screen.getAllByTestId("text-field-test");  
  expect(app[0]).toBeInTheDocument();
  expect(app[0]).toHaveClass("container");  
});
test('check text of input label', () => {
  render(<App />);
  const app=screen.getByTestId("text-field-label-test");  
  expect(app).toBeInTheDocument();
  expect(app).toHaveClass("form-label"); 
  expect(app).toHaveTextContent("Input URL");  
});
test('check text of input field', () => {
  render(<App />);
  const app=screen.getByTestId("text-field-input-test");
  expect(app).toBeInTheDocument();  
  expect(app).toHaveClass("form-control");  
  expect(app).toHaveTextContent("");  
  act(() => {
    fireEvent.change(app,{
      target: { value: "www.linkedin.com" }
    })
  })
  expect(app).toHaveValue("www.linkedin.com");
});
test('hidden error message', () => {
  render(<App />);
  const error=screen.getByTestId("error-test");  
  expect(error).toBeInTheDocument();
  expect(error).toHaveClass("container");  
  expect(error).toBeVisible(false);
});
test('Empty URL Submit', () => {
  render(<App />);
  const app=screen.getAllByTestId("button-test"); 
  expect(app[0]).toBeInTheDocument();
  const button=app[0];
  act(()=>{
    fireEvent.click(button);
   })
  const error=screen.getByTestId("error-test"); 
  expect(error).toBeInTheDocument();
  expect(error).toBeVisible();
  expect(error).toHaveTextContent("Url should not be empty");
});
test('Clear URL action', () => {
  render(<App />);
  const app=screen.getAllByTestId("button-test"); 
  expect(app[1]).toBeInTheDocument();
  const button=app[1];
  fireEvent.click(button);
  const error=screen.getByTestId("error-test"); 
  expect(error).toBeInTheDocument();
  expect(error).toBeVisible(false);
  expect(error).toHaveTextContent("");
  const inputField=screen.getByTestId("text-field-input-test");
  expect(inputField).toBeInTheDocument();
  expect(inputField).toHaveTextContent(''); 
});

test('Render Short Url by API response', async() => {
  render(<App />);
  const btn = screen.getAllByTestId("button-test")[0];
  const originalUrl=screen.getByTestId("text-field-input-test");
  fireEvent.change(originalUrl,{
    target:{value:"wwww.linkedin.com"}
  })
  fireEvent.click(btn);
  server.use();
  await waitFor(()=>screen.getAllByTestId("text-field-input-test"))
  const shortUrl=screen.getByTestId("text-field-input-test");
  expect(shortUrl).toBeInTheDocument();
  
});


