import React from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { CharToken } from "components/CharToken";

import { createSelector } from "reselect";
interface GridBoxProps {
    gridKey: string;
    items: any[];
    gridSize: number;
    visible: boolean;
}

interface GridBoxState {}

class GridBox extends React.Component<GridBoxProps, GridBoxState> {
    render() {
        const { gridKey, items, gridSize, visible } = this.props;
        return (
            <Droppable droppableId={gridKey} key={gridKey}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={{
                            width: gridSize,
                            height: gridSize,
                            border: "1px dashed #88888880",
                            boxSizing: "border-box",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1,
                            ...(!visible ? { background: "#000", opacity: 0.9 } : {})
                        }}
                    >
                        {visible &&
                            items &&
                            items.length > 0 &&
                            items.map((token: any, index: number) => (
                                <CharToken
                                    token={token}
                                    tokenSize={gridSize / items.length}
                                    tokenId={token.tokenID}
                                    tokenIndex={index}
                                />
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}
const getStateForGridBox = createSelector(
    (state: any, props: any) => {
        if (state.grid[props.mapKey]) {
            const map = state.grid[props.mapKey];
            if (map) {
                return state.grid[props.mapKey][props.gridKey];
            }
        }

        return {
            items: [],
            visible: false
        };
    },
    (gridObject: any) => {
        return {
            ...gridObject
        };
    }
);

const mapStateToProps = (state: any, props: any) => {
    return {
        ...props,
        ...getStateForGridBox(state, props)
    };
};

export default connect(
    mapStateToProps,
    null
)(GridBox);
