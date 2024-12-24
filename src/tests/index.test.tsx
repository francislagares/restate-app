import { screen } from '@testing-library/react-native';

import Index from '@/app/(root)/(tabs)';

import { render } from './custom-render';

describe('Index View', () => {
  it('should render without crashing', () => {
    render(<Index />);

    const view = screen.getByText(/welcome to restate/i);

    expect(view).toBeOnTheScreen();
  });
});
