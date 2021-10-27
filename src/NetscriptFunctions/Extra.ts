import { WorkerScript } from "../Netscript/WorkerScript";
import { IPlayer } from "../PersonObjects/IPlayer";
import { Exploit } from "../Exploits/Exploit";

export interface INetscriptExtra {
  heart: {
    break(): number;
  };
  exploit(): void;
  bypass(doc: Document): void;
  alterReality(): void;
}

export function NetscriptExtra(player: IPlayer, workerScript: WorkerScript): INetscriptExtra {
  return {
    heart: {
      // Easter egg function
      break: function (): number {
        return player.karma;
      },
    },
    exploit: function (): void {
      player.giveExploit(Exploit.UndocumentedFunctionCall);
    },
    bypass: function (doc: any): void {
      // reset both fields first
      doc.completely_unused_field = undefined;
      const real_document: any = document;
      real_document.completely_unused_field = undefined;
      // set one to true and check that it affected the other.
      real_document.completely_unused_field = true;
      if (doc.completely_unused_field && workerScript.ramUsage === 1.6) {
        player.giveExploit(Exploit.Bypass);
      }
      doc.completely_unused_field = undefined;
      real_document.completely_unused_field = undefined;
    },
    alterReality: function (): void {
      const x = eval("false");
      console.warn("I am sure that this variable is false.");
      // add Math.random so webpack doesn't optimise the if away
      if (x !== false) {
        console.warn("Reality has been altered!");
        player.giveExploit(Exploit.RealityAlteration);
      }
    },
  };
}
