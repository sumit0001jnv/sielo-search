import React from 'react'

export default function LeftMenu() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };
    const menuObject = [{ name: 'Database', path: 'databases', icon: DatasetIcon }, { name: 'Credentials', path: 'credentials', icon: KeyIcon }, { name: 'Search', path: 'search', icon: ContentPasteSearchIcon }];
    const selectMenu = (path) => {
        navigate(path);
    }
    return (
        <Drawer
            sx={{
                width: isMobile ? '90vw' : drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isMobile ? '90vw' : drawerWidth,
                    marginTop: '73px',
                    boxSizing: 'border-box',
                },
            }}
            variant={isMobile ? "temporary" : "persistent"}
            anchor="left"
            open={openDrawer}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {menuObject.map((obj, index) => (
                    <ListItem key={obj.name} disablePadding>
                        <ListItemButton onClick={() => selectMenu(obj.path)}>
                            <ListItemIcon>
                                {<obj.icon />}
                            </ListItemIcon>
                            <ListItemText primary={obj.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
