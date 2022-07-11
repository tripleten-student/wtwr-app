import './ToggleSwitch.css';

/**
 * The **ToggleSwitch** component renders a switch used to toggle temperature units.
 *
 * @author [Shraddha](https://github.com/5hraddha)
 */
const ToggleSwitch = () => {
  return (
    <div className="toggleswitch">
      <label className="toggleswitch__label">
        <input className="toggleswitch_checkbox toggleswitch__checkbox_state_hidden" type="checkbox" name="toggleswitch-checkbox" value="1" />
        <span className="toggleswitch__checkbox toggleswitch__checkbox_state_visible"></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
