import React from "react";
import { Switch } from "@radix-ui/react-switch";

function SwitchUserDefine({ toggleOn, settoggleOn }) {
  return (
    <div>
      <Switch
        checked={toggleOn}
        onCheckedChange={settoggleOn}
        className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${
          toggleOn ? "bg-[#030391]" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-300 ${
            toggleOn ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </Switch>
    </div>
  );
}

export default SwitchUserDefine;
