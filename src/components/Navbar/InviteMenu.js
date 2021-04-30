import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid, InputLabel } from '@material-ui/core';
const TitleMenu = styled.div`
    position: absolute;
    top: 5rem;
    background-color: #FFFFFF;
    border-radius: .3rem;
    width: 20rem;
    height: 25rem;
    padding: 0 12px 12px 12px;
    color: #6b808c;
    z-index: 5;
    border: 1px solid rgba(0,0,0,0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
const Header = styled.div`
    border-bottom: 1px solid #dcdfe3;
    padding: 1.2rem 0;
`;
const Title = styled.label`
    text-align: center;
    display: block;
    font-weight: 400;
    width: 100%;
    font-size: 1rem;
`;
const CloseMenuButton = styled.button`
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    border: none;
    color: #6b808c;
    background-color: transparent;
    font-size: 1.5rem;

    &:hover {
        color: #000000;
        cursor: pointer;
    }
`;
const Form = styled.div``;
const Input = styled.input`
    width: 100%;
    height: 2rem;
    padding: 1.5rem .8rem;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    color: #17394d;
    background-color: #ebeef071;
    border: 2px solid #dfe3e6;
    border-radius: .3rem;
    margin: 0rem 0rem 1rem 0rem;

    &:hover {
        background-color: #ebeef0;
    }

    &:focus {
        border: 2px solid #0079bf;
        outline: none;
    }
`;
const SaveButton = styled.button`
    background-color: #5aac44;
    color: white;
    width: 5rem;
    height: 2.5rem;
    border-radius: 3px;
    font-size: 1rem;
    font-weight: 700;
    border: none;

    &:hover {
        filter: brightness(110%);
        cursor: pointer;
    }
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #000000;
    margin: 1rem 0;
    display: block;
`;
const formControl = styled.label`
      margin: theme.spacing(1),
      min-width: 120
`

const InviteMenu = ({
    handleShowInvite,
    handleSubmitInvite,
    onEmailChange,
    onRoleChange
}) => {
    // console.log(onRoleChange)
    return (

        <TitleMenu>
            <Header>
                <Title>Mời vào</Title>
                <CloseMenuButton onClick={handleShowInvite}><FontAwesomeIcon icon={faTimes} /></CloseMenuButton>
            </Header>

            <Form >
                <form onSubmit={handleSubmitInvite}>
                    <Grid container>
                        <Grid item md={12}>
                            <Label>Nhập email</Label>
                            <Input onChange={onEmailChange} name="name" />
                        </Grid>
                        <Grid item md={12}>
                            <Label>Chọn role</Label>
                        </Grid>
                        <Grid item md={12} style={{ width: '100%' }}>
                            <FormControl variant="outlined" className={formControl} style={{ width: '100%', marginBottom: 15 }}>
                                <InputLabel id="demo-simple-select-outlined-label">Chức vụ</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={onRoleChange}
                                    label="Chức vụ"
                                    required
                                >
                                    <MenuItem value='admin'>Admin</MenuItem>
                                    <MenuItem value='member'>Member</MenuItem>
                                    {/* <MenuItem value='observer'>Observer</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={12} style={{ width: '100%' }}>
                            <SaveButton type="submit" style={{ marginLeft: '34%' }}>Thêm</SaveButton>
                        </Grid>

                    </Grid>
                </form>
            </Form>
        </TitleMenu>
    );
}

export default InviteMenu;
