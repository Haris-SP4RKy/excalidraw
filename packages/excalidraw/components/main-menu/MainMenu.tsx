import React from "react";

import { composeEventHandlers } from "@excalidraw/common";

import { useTunnels } from "../../context/tunnels";
import { useUIAppState } from "../../context/ui-appState";
import { t } from "../../i18n";
import { useEditorInterface, useExcalidrawSetAppState } from "../App";
import { UserList } from "../UserList";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { withInternalFallback } from "../hoc/withInternalFallback";
import { HamburgerMenuIcon } from "../icons";

import * as DefaultItems from "./DefaultItems";

const MainMenu = Object.assign(
  withInternalFallback(
    "MainMenu",
    ({
      children,
      onSelect,
    }: {
      children?: React.ReactNode;
      /**
       * Called when any menu item is selected (clicked on).
       */
      onSelect?: (event: Event) => void;
    }) => {
      const { MainMenuTunnel } = useTunnels();
      const editorInterface = useEditorInterface();
      const appState = useUIAppState();
      const setAppState = useExcalidrawSetAppState();

      return (
        <MainMenuTunnel.In>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Logo, Dropdown, Canvas Name, Copy & Upgrade Section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "6px 12px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                width: "fit-content",
              }}
            >
              {/* Logo */}
              <img
                src="https://worktransformers.ai/assets/images/logo/logo.png"
                alt="Logo"
                style={{ width: "32px", height: "32px", borderRadius: "4px" }}
              />

              {/* Dropdown Arrow */}
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Canvas Name */}
              <span
                style={{
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}
              >
                My first canvas
              </span>

              {/* Copy Button */}
              <button
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "500",
                  flexShrink: 0,
                }}
                onClick={() => {
                  // Add your copy logic here
                  console.log("Copy clicked");
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>

              {/* Upgrade Button */}
              <button
                style={{
                  background: "#FF6A56",
                  border: "none",
                  borderRadius: "6px",
                  padding: "7px 14px",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  boxShadow: "0 2px 8px rgba(255, 107, 107, 0.3)",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
                onClick={() => {
                  // Add your upgrade logic here
                  console.log("Upgrade clicked");
                }}
              >
                Upgrade
              </button>
            </div>

            {/* Hamburger Menu */}
            <DropdownMenu open={appState.openMenu === "canvas"}>
              <DropdownMenu.Trigger
                onToggle={() => {
                  setAppState({
                    openMenu: appState.openMenu === "canvas" ? null : "canvas",
                    openPopup: null,
                    openDialog: null,
                  });
                }}
                data-testid="main-menu-trigger"
                className="main-menu-trigger"
              >
                {HamburgerMenuIcon}
              </DropdownMenu.Trigger>

              <DropdownMenu.Content
                onClickOutside={() => setAppState({ openMenu: null })}
                onSelect={composeEventHandlers(onSelect, () => {
                  setAppState({ openMenu: null });
                })}
                placement="bottom"
                className={
                  editorInterface.formFactor === "phone"
                    ? "main-menu-dropdown"
                    : ""
                }
              >
                {children}
                {editorInterface.formFactor === "phone" &&
                  appState.collaborators.size > 0 && (
                    <fieldset className="UserList-Wrapper">
                      <legend>{t("labels.collaborators")}</legend>
                      <UserList
                        mobile={true}
                        collaborators={appState.collaborators}
                        userToFollow={appState.userToFollow?.socketId || null}
                      />
                    </fieldset>
                  )}
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </MainMenuTunnel.In>
      );
    },
  ),
  {
    Trigger: DropdownMenu.Trigger,
    Item: DropdownMenu.Item,
    ItemLink: DropdownMenu.ItemLink,
    ItemCustom: DropdownMenu.ItemCustom,
    Group: DropdownMenu.Group,
    Separator: DropdownMenu.Separator,
    DefaultItems,
  },
);

export default MainMenu;
