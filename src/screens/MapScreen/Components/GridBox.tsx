import React from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { CharToken } from "components/CharToken";

interface GridBoxProps {
    dropKey: string;
    dropArray: any[];
    gridSize: number;
}

interface GridBoxState {}

class GridBox extends React.PureComponent<GridBoxProps, GridBoxState> {
    render() {
        const { dropKey, dropArray, gridSize } = this.props;
        return (
            <Droppable droppableId={dropKey} key={dropKey}>
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
                            zIndex: 1
                        }}
                    >
                        {dropArray &&
                            dropArray.length > 0 &&
                            dropArray.map((token: any, index: number) => (
                                <CharToken
                                    token={token}
                                    tokenSize={gridSize / dropArray.length}
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

const mapStateToProps = (state: any) => {
    return null;
};

export default connect(
    mapStateToProps,
    null
)(GridBox);
